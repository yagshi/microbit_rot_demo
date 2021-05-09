function readPat() {
    const pat: number[][] = [];
    for (let y = 0; y < 7; y++) {
        const row: number[] = [];
        for (let x = 0; x < 7; x++) {
            const p = led.pointBrightness(x - 1, y - 1);
            row.push(p ? p : 0);
        }
        pat.push(row);
    }
    return pat;
}

function rotate(pat: number[][], angle: number) {
    const ret: number[][] = [[], [], [], [], [], [], []];
    for (let y = 1; y < 6; y++) {
        for (let x = 1; x < 6; x++) {
            const s = Math.sin(angle);
            const c = Math.cos(angle);
            const x1 = c * (x - 3) - s * (y - 3) + 3;
            const y1 = s * (x - 3) + c * (y - 3) + 3;
            const x1i = Math.floor(x1);
            const x1f = x1 - x1i;
            const y1i = Math.floor(y1);
            const y1f = y1 - y1i;
            const p = (pat[y1i    ][x1i] * (1 - x1f) + pat[y1i    ][x1i + 1] * x1f) * (1 - y1f) +
                      (pat[y1i + 1][x1i] * (1 - x1f) + pat[y1i + 1][x1i + 1] * x1f) * y1f;
            ret[y][x] = p;
        }
    }
    return ret;
}
const tgt: string = "/._0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
basic.forever(function () {
    for (let i = 0; i < tgt.length; i++) {
        basic.showString(tgt[i]);
        const pat0 = readPat();
        for (let angle = 0; angle < 720; angle += 5) {
	        const pat = rotate(pat0, Math.PI * angle / 180);
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 5; x++) {
                    led.plotBrightness(x, y, pat[y + 1][x + 1]);
                }
            }
            basic.pause(10);
        }
    }
});
