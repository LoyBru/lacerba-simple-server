import express from 'express';

const app = express();


app.use(express.json());

//let cnt = 0;

//CRUD - Create Read Update Delete

interface BlogPost {
    title: string;
    date: Date;
    body: string;
    id: number;
    draft: boolean;
}


type PostInpuData = Pick<BlogPost, 'body' | 'title'>;

const validationInputMiddleware: express.RequestHandler = (req, res, next) => {
    const postData: PostInpuData = req.body;

    if (!postData.title) {
        res.status(403).send({ error: "title field is required" })
        return;
    }

    if (!postData.body) {
        res.status(403).send({ error: "body field is required" })
        return;
    }

    next();
};

let posts: BlogPost[] =
    [
        // {
        //     id: 0,
        //     title: 'first post',
        //     date: new Date(),
        //     body: 'this is the first post',
        //     draft: false,
        // },
        // {
        //     id: 1,
        //     title: 'secondo post',
        //     date: new Date(),
        //     body: 'this is the second post',
        //     draft: false,
        // },

    ];


app.get('/posts/', (req, res) => {
    res.send(posts);
})

app.get('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id == id);
    if (!post) {
        res.status(404).send({ msg: "Not found" });
        return
    }
    res.send(post);
    return

});

app.post('/posts/:id/public', (req, res) => {
    const id = Number(req.params.id);
    const postToPublicIdx = posts.findIndex((post) => post.id == id);
    if (!postToPublicIdx) {
        res.status(404).send({ msg: "Not found" });
        return;
    }

    posts[postToPublicIdx].draft = true;

    res.send(posts[postToPublicIdx]);
    return;

});

app.post('/posts/', validationInputMiddleware, (req, res) => {
    const postData: PostInpuData = req.body;
    const lastPost = posts[posts.length - 1]
    let id = 0;
    if (lastPost) {
        id = lastPost.id + 1;
    }
    const newPost: BlogPost = {
        id: id,
        date: new Date(),
        draft: false,
        title: postData.title,
        body: postData.body,
    };


    posts.push(newPost);
    res.status(201).send(newPost)
    return
})


app.delete('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const postToDelete = posts.find((post) => post.id == id);
    if (!postToDelete) {
        res.status(404).send({ msg: 'Not found' });
    }

    posts = posts.filter((post) => post.id != id)
    res.send(postToDelete);
    return;


})

app.put('/posts/:id', validationInputMiddleware, (req, res) => {
    const id = Number(req.params.id);
    const postData: PostInpuData = req.body;

    const postToUpdateIndex = posts.findIndex((post) => post.id == id);
    if (!posts[postToUpdateIndex]) {
        res.status(404).send({ msg: 'Not Found' });
        return;
    }

    posts[postToUpdateIndex] = {
        ...posts[postToUpdateIndex],
        title: postData.title,
        body: postData.body,
    }

    res.send(posts[postToUpdateIndex]);

    return;

})



// app.get('/', (req, res)=> {
//     cnt += 1;
//     res.send( { hello: 'world', cnt } )
// })

// app.post('/', (req, res)=> {
//     cnt += -1;
//     res.send( { hello: 'world', cnt } )
// })

// app.post('/reply', (req, res)=> {
//     const body = req.body;
//     console.log(body);
//     res.send({body : body})

// })

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server st arted at http://localhost:3000');
});