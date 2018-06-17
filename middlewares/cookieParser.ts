export default function cookieParser(req: any, res: any, next: any) {
    let cookies = req.header('Set-Cookie');
    let parsedCookies: any = {};

    cookies && cookies.split(';').forEach((cookie: string) => {
        let parts: string[] = cookie.split('=');
        parsedCookies[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    res.parsedCookies = parsedCookies;
    next();

}

// module.exports = cookieParser;