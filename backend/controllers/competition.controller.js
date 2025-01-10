module.exports.sendQueries = (req,res) => {

    try{
        const level = req.params.level;
        const queries = [ // Should be fethed from a database
            {description:'This is an easy query of level 1', difficulty: 0, level:1},
            {description:'This is a medium query of level 1', difficulty: 1, level:1},
            {description:'This is a hard query of level 1', difficulty: 2, level:1},
            {description:'This is an easy query of level 2', difficulty: 0, level:2},
            {description:'This is a medium query of level 2', difficulty: 1, level:2},
            {description:'This is a hard query of level 2', difficulty: 2, level:2},
            {description:'This is an easy query of level 3', difficulty: 0, level:3},
            {description:'This is a medium query of level 3', difficulty: 1, level:3},
            {description:'This is a hard query of level 3', difficulty: 2, level:3},
        ]
        const filteredQueries = queries.filter(ele => ele.level == level).map(ele => ({...ele}));
        res.status(200).json({message:'Queris found successfully', queries : filteredQueries})
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
}