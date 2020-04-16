const app = require('../src/app');
describe("App test", ()=>{
    it("App should be valid", () => {
        expect(app).not.toBeUndefined();
    })
})