const request = (url: RequestInfo, data?: RequestInit): Promise<Response> => {
    return new Promise((resolve, reject) => {
        const success = String(url)[0] !== '-';
        setTimeout(() => (success ? resolve : reject)({
            ok: success,
            body: Math.random()
        } as any), 2000);
    })
}

export default request;