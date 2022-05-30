class Road {
    constructor(speed) {
        self.h = 80;
        self.w = 20;
        self.speed = speed;

        self.count = 6;
        self.offset = 90;

        self.blocks = [];

        for (let i = 0; i < self.count; i++) {
            self.blocks.push({
                x: width / 2,
                y: -((self.h + self.offset) * (i + 1)),
                h: self.h,
                w: self.w,
            });
        }
    }

    show() {
        push();
        rectMode(CENTER);
        fill(255, 150);
        for (let b of self.blocks) rect(b.x, b.y, b.w, b.h);

        pop();
    }

    update() {
        for (let b of self.blocks) {
            b.y += self.speed;
            if (b.y > height + b.h) {
                b.y = -self.w;
            }
        }
    }
}
