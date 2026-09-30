const { MongoClient , ObjectId} = require ("mongodb")
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
const dbName = "task-4"

async function addUser(){
    try{
        await client.connect()
        console.log("connected to DB successfully")

        const db = client.db(dbName)
        const users = db.collection("users")

        const result = await users.insertOne({
            name : "Ankit",
            age : 20,
            city : "germany"
        })
        console.log("inserted user : " , result.insertedId)

        await addNewUser(users)
        await addManyUsers(users)
        await findUser(users)
        await limitUsers(users)
        await findOneUser(users)
        await countUsers(users)
        await updateUser(users , "69bab191a11a8bf4695ed23b")
        await updateManyUsers(users)
        await deleteUser(users , "69bab190a11a8bf4695ed23a")
        await deleteManyUsers(users)
    }
    catch(err){
        console.log(err)
    }
}

addUser()

//new user
async function addNewUser(users){
    const result = await users.insertOne({
        name : "amr",
        age : 25,
        city : "cairo"
    })
    console.log("inserted user : " , result.insertedId)
}

//many users
async function addManyUsers(users){
    const result = await users.insertMany([
        {
            name : "mohamed",
            age : 27,
            city : "cairo"
        },
        {
            name : "mahmoud",
            age : 27,
            city : "cairo"
        },
        {
            name : "ahmed",
            age : 27,
            city : "cairo"
        },
        {
            name : "ali",
            age : 27,
            city : "cairo"
        },
        {
            name : "mohsen",
            age : 27,
            city : "cairo"
        },
        {
            name : "diaa",
            age : 25,
            city : "cairo"
        },
        {
            name : "Aamer",
            age : 25,
            city : "cairo"
        },
        {
            name : "islam",
            age : 25,
            city : "cairo"
        },
        {
            name : "adham",
            age : 25,
            city : "cairo"
        },
        {
            name : "tawfek",
            age : 25,
            city : "cairo"
        }
    ])
    console.log("inserted users : " , result.insertedIds)
}

//find
async function findUser(users){
    const user = await users.findOne({_id: new ObjectId(id) })
    if(user){
        console.log('found user :' , user)
    }
    else{
        console.log("user not found")
    }
}

//limit
async function limitUsers(users){
    const data = await users.find({age : 27}).limit(3).toArray()
    console.log("users : " , data)
}

//findOne
async function findOneUser(users){
    const user = await users.findOne({id : ""})
    if(user){
        console.log("found user : " , user)
    }
    else{
        console.log("user not found")
    }
}

//count
async function countUsers(users){
    const count = await users.countDocuments({age : 27})
    console.log("number of users : " , count)
}

//update
async function updateUser(users){
    const result = await users.updateOne({_id : new ObjectId(id)} ,
     {$set : {name : "adham"},
     $inc : {age : 20}})
    console.log("updated user : " , result)
}

//update many
async function updateManyUsers(users){
    const result = await users.updateMany(
        {},
        {$inc : {age : 20}}
    )
    console.log("updated users : " , result)
}

//delete
async function deleteUser(users, id){
    const result = await users.deleteOne({_id : new ObjectId(id)})
    console.log("deleted user : " , result)
}

//delete many
async function deleteManyUsers(users){
    const result = await users.deleteMany({age : 27})
    console.log("deleted users : " , result)
}