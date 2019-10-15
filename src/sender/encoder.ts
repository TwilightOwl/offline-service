import * as Types from "../types"

const escape = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const getEncoder = (qt: string, idqt: string) => ({
  encoder: (id: string) => (
    (...keys: (string|number)[]) => `${qt}${idqt}${id}${idqt}${[''].concat(keys as ConcatArray<any>).join('.')}${qt}`
  ),
  getDecodedIDs: (...encodeds: any[]) => {
    return encodeds
      .reduce((acc, encoded) => {
        try {
          if (!encoded) return acc;
          const serialized = JSON.stringify(encoded);
          const regex = `${escape(qt)}${escape(idqt)}(.*?)${escape(idqt)}`
          const result = (serialized
            .match(RegExp(regex, 'g')) || [])
            .map(x => (x.match(RegExp(regex)) || [])[1]);
          return acc.concat(result)
        } catch (error) {
          // Actually there shouldn't be any errors here
        }
      }, [])
      .filter((value: string, index: number, list: string[]) => list.indexOf(value) === index)
  },
  decoder: (id: string, value: any) => (
    (encoded: any) => {

      const removeFirstQuote = (str: string) => str[0] === '"'
        ? { result: str.substr(1), removed: true } 
        : { result: str };
      const removeLastQuote = (str: string) => str[str.length - 1] === '"' 
        ? { result: str.substr(0, str.length - 1), removed: true } 
        : { result: str };

      const replace = (data: string): string => {
        const result = data.match(RegExp(`${escape(qt)}${escape(idqt)}${escape(id)}${escape(idqt)}(.*?)${escape(qt)}`))
        
        if (result) {
          const { 0: found, 1: keys, index: start } = result;
          if (start === undefined) {
            throw 'Start is undefined, check replace method in decoder'
          }
          let actualValue;
          try {
            actualValue = keys.split('.').filter(x => x.trim())
              .reduce((acc, key) => {
                if (key in acc) {
                  return acc[key]
                } else {
                  throw `Key ${key} doesn't exist in target object`
                }
              }, value);
          } catch (error) {
            throw "Retrieve resolved response value error"
          }
          const { result: head, removed } = removeLastQuote(data.substr(0, start))
          const first = head + 
            (removed ? JSON.stringify(actualValue) : JSON.stringify(actualValue).replace(/\"/g,'\\"'));
          return first + removeFirstQuote(replace(data.substr(start + found.length))).result
        }
        return data
      }

      try {
        const serialized = JSON.stringify(encoded);
        const result = replace(serialized);
        return JSON.parse(result);
      } catch (error) {
        throw error
      }
    }
  )
})

export const { encoder, decoder, getDecodedIDs } = getEncoder(Types.FUTURE_OBJECT_QUOTE, Types.FUTURE_ID_QUOTE)