const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const validator = require("../utils/dataValidator")

const prisma = new PrismaClient();

async function getUser(uid) {
    const user = await prisma.user.findFirst({ where: { id: parseInt(uid) } })

    if (!user) {
        return { error: "User not found." }
    }
    else {
        return {
            email: user?.email,
            name: user?.name,
            profilePictureUrl: user?.profilePictureUrl
        };
    }
}

async function updateUserDetails(uid, options) {
    const { username, email, profilePicture } = options;

    const validationCheck = await validator.validateUserDetails(uid, options)

    if (!validationCheck.check) {
        return {
            error: validationCheck.message
        }
    }

    console.log(uid)
    const user = await prisma.user.update({
        where: {
            id: parseInt(uid)
        },
        data: {
            name: username,
            email,
            profilePictureUrl: profilePicture
        },
    })

    if (!user) {
        return { error: "User Not Found." }
    }
    return user;
}

async function updateUserPassword(uid, oldPassword, newPassword, newPasswordConfirm) {

    console.log("data passed: ", oldPassword, newPassword, newPasswordConfirm)
    return new Promise(async (resolve, reject) => {
        const user = await prisma.user.findFirst({ where: { id: uid } });


        const validationCheck = await validator.validatePasswordUpdate(uid, oldPassword, newPassword, newPasswordConfirm)
        console.log("Check: ", validationCheck.check)
        if (!validationCheck.check) {
            reject({
                error: validationCheck.message
            })
        }

        bcrypt.compare(oldPassword, user?.pwdHash).then(match => {
            console.log("match: ", match)
            if (match) {
                bcrypt.hash(newPassword, 10)
                    .then(async (hash) => {
                        const user = await prisma.user.update({
                            where: {
                                id: parseInt(uid)
                            },
                            data: {
                                pwdHash: hash
                            },
                        })

                        if (!user) {
                            reject({ error: "Erorr updating password." });
                        }
                        else {
                            resolve(user);
                        }
                    })
            }
            else {
                reject({ error: "Incorrect old password." })
            }
        })
    })
}

module.exports = { getUser, updateUserDetails, updateUserPassword }