import { Innertube, UniversalCache, YTNodes } from 'youtubei.js';
import Express from 'express';
const app = Express();
const port = 33000;
const yt = await Innertube.create({
    cache: new UniversalCache(false)
});
app.get('/endcards', async (req, res) => {
    if (typeof req.query.id === "string") {
        try {
            const vid = await yt.getInfo(req.query.id);
            const endcards = vid.endscreen?.elements;
            if (typeof endcards !== "undefined") {
                endcards.forEach(endcard => {
                    const endcardData = endcard.as(YTNodes.EndscreenElement);
                    const resoData = `${endcardData.style}\n${endcardData.title.text}\n${endcardData.endpoint.toURL()}\n${endcardData.image[0].url}\n${endcardData.top}|${endcardData.left}|${endcardData.width}|${endcardData.aspect_ratio}`;
                    console.log(resoData);
                });
            }
            else {
                res.status(404).send("No endcards");
            }
            res.json(endcards);
        }
        catch (e) {
            if (typeof e === "string") {
                res.status(404).send(e);
            }
            else if (e instanceof Error) {
                res.status(404).send(e.message);
            }
        }
    }
    else {
        res.status(404).send("Video not found");
    }
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
