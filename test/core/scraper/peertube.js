import assert      from "assert";
import { extract } from "../../../src/core/scrapers.js";

describe("scraper/peertube", function () {
    describe("https://PEERTUBE/videos/watch/*", function () {
        it("should return video id", function () {
            const url = "https://framatube.org/videos/watch/" +
                                         "0b04f13d-1e18-4f1d-814e-4979aa7c9c44";
            const expected = "https://peertube.datagueule.tv/static/webseed/" +
                                "0b04f13d-1e18-4f1d-814e-4979aa7c9c44-1080.mp4";
            return extract(url).then(function (file) {
                assert.strictEqual(file, expected);
            });
        });

        it("should return error when it's not a video", function () {
            const url = "https://peertube.mastodon.host/videos/watch/uuid";
            const expected = "novideo";
            return extract(url).then(function () {
                assert.fail();
            }, function (error) {
                assert.strictEqual(error.name, "PebkacError");
                assert.ok(error.title.includes(expected));
                assert.ok(error.message.includes(expected));
            });
        });
    });

    describe("https://PEERTUBE/videos/embed/*", function () {
        it("should return video id", function () {
            const url = "https://framatube.org/videos/watch/" +
                                         "0900bd2e-7306-4c39-b48b-2d0cd611742e";
            const expected = "https://framatube.org/static/webseed/" +
                                "0900bd2e-7306-4c39-b48b-2d0cd611742e-1080.mp4";
            return extract(url).then(function (file) {
                assert.strictEqual(file, expected);
            });
        });
    });
});