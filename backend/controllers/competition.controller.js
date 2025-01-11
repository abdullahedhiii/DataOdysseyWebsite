module.exports.sendQueries = (req,res) => {
    
    try{
        const level = req.params.level;
        const queries = [ // Should be fethed from a database
            {
                id: 1,
                title: "Tracking Time Efficiency of Top Participants",
                description: 'To highlight time efficiency, the organizers want to find the fastest participant in solving at least 5 problems while maintaining a position in the top 10 scorers.',
                difficulty: 'Easy',
                level:1
            },
            {
                id: 2,
                title: "Identifying the Clutch Performers",
                description: `During the competition, organizers want to identify users who made a significant comeback by being outside the top 10 in the first half but finishing in the top 5 by the end. This will highlight participants who showed exceptional performance under pressure.`,
                difficulty: 'Medium',
                level:1
            },
            {id:3,title:"Detecting Problem Masters", description:'The organizers want to reward users who solved the hardest problems (those solved by the least number of participants). The query should list the hardest problems and the users who solved them.', difficulty: 'Hard', level:1},
            {id:4,title:"title4", description:'This is an easy query of level 2', difficulty: 'Easy', level:2},
            {id:5,title:"title5", description:'This is a medium query of level 2', difficulty: 'Medium', level:2},
            {id:6,title:"title6", description:'This is a hard query of level 2', difficulty: 'Hard', level:2},
            {id:7,title:"title7", description:'This is an easy query of level 3', difficulty: 'Easy', level:3},
            {id:8,title:"title8", description:'This is a medium query of level 3', difficulty: 'Medium', level:3},
            {id:9,title:"title9", description:'This is a hard query of level 3', difficulty: 'Hard', level:3},
        ]
        const filteredQueries = queries.filter(ele => ele.level == level).map(ele => ({...ele}));
        res.status(200).json({message:'Queris found successfully', queries : filteredQueries})
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
}