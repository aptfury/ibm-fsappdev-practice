import express from 'express';

const router = express.Router();

let users = [
    {
        firstName: "John",
        lastName: "Wick",
        email: "johnwick@gamil.com",
        DOB: "22-01-1990",
    },
    {
        firstName: "John",
        lastName: "Smith",
        email: "johnsmith@gamil.com",
        DOB: "21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "White",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET: Retrieve all users
router.get("/", (req, res) => {
    res.send(JSON.stringify({users}, null, 4));
});

// GET by Specific ID: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
    const email = req.params.email;

    let filtered_users = users.filter((user) => user.email === email);

    res.send(filtered_users);
});

// POST: Create a new user
router.post("/", (req, res) => {
    users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
    });

    res.send(`The user ${req.query.firstName} has been added!`);
});

// PUT: Updated the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);

    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];

        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        let DOB = req.query.DOB;

        if (firstName) {
            filtered_user.firstName = firstName;
        }

        if (lastName) {
            filtered_user.lastName = lastName;
        }

        if (DOB) {
            filtered_user.DOB = DOB;
        }

        users = users.filter((user) => user.email != email);
        users.push(filtered_user);

        res.send(`User with the email ${email} updated.`);
    } else {
        res.send("Unable to find user!"); // Don't do this bc security issue
    }
});

// DELETE: Delete a user by email ID - ideally there should be more checks in place?
router.delete("/:email", (req, res) => {
    const email = req.params.email;

    users = users.filter((user) => user.email != email);

    res.send(`User with the email ${email} has been deleted.`);
});

export { router };
