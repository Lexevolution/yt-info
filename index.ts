import {Innertube, UniversalCache} from 'youtubei.js';
import Express from 'express';

const app = Express();
const port = 33000;

const yt = await Innertube.create({
    cache: new UniversalCache(false)
});

app.get('/endcards', async (req, res) => {
    if (typeof req.query.id === "string"){
        try
        {
            var vid = await yt.getInfo(req.query.id);
            var endcards = vid.endscreen?.elements;
            res.json(endcards);
        }
        catch
        {
            res.status(404).send("Video not found");
        }
    }
    else {
        res.status(404).send("Video not found");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});