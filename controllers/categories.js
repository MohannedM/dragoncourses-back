exports.getCategories = (req,res,next)=>{
    res.status(200).json({
        categories:[
            {
                _id: 1,
                name: "Software Development"
            },
            {
                _id: 2,
                name: "Internet Security"
            },
            {
                _id: 3,
                name: "Marketing Techniques"
            },
            {
                _id: 4,
                name: "Business Development"
            }
            
        ]
    })
}