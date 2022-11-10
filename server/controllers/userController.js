const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const _ = require('lodash')
const validator = require("../utils/dataValidator")
const { sign } = require('jsonwebtoken');

const DEFAULT_USER_PROFILE_PICTURE = 'https://i.ibb.co/PhSqFRL/TMA-DPP-2.jpg'

const prisma = new PrismaClient()

async function loginUser(username, password) {
    const user = await prisma.user.findFirst({ where: { name: username, isDeleted: false } });
    return new Promise((resolve, reject) => {
        if (!user) {
            reject({ error: "Invalid credentials!" })
        }
        else {
            bcrypt.compare(password, user.pwdHash).then(match => {
                if (match) {
                    console.log("matched")
                    const accessToken = sign({
                        uid: user.id,
                        username: user.username,
                        profilePictureURL: user.profilePictureURL
                    }, "jwtkey");

                    resolve(accessToken);
                }
                else {
                    console.log("match failed")
                    reject({ error: 'Invalid credentials' })
                }
            })
        }
    })
}

async function registerUser(username, email, password, confirmPassword) {
    console.log(username, email, password, confirmPassword)

    return new Promise(async (resolve, reject) => {


        const validationCheck = await validator.validateRegistration(username, password, email, confirmPassword)
        console.log(validationCheck)
        if (!validationCheck.check) {
            reject({
                error: validationCheck.message
            })
            return;
        }

        bcrypt.hash(password, 10).then(async (hash) => {
            const user = await prisma.user.create({
                data: {
                    name: username,
                    email,
                    pwdHash: hash,
                    profilePictureUrl: DEFAULT_USER_PROFILE_PICTURE,
                    isDeleted: false
                }
            })
            const accessToken = sign({ uid: user.id, username: user.username, profilePictureURL: user.profilePictureURL }, "jwtkey")
            resolve({ accessToken: accessToken, user: user });
        })
    })
}

async function addMovieToList(movie, userId) {
    const user = await prisma.user.findFirst({ where: { id: userId }, include: { list: true } })
    const movieParam = await prisma.movie.create({ data: { title: movie.title, poster_path: movie.poster_path, User: { connect: { id: userId } }, forwardId: movie.id } })

    if (_.find(user?.list, { forwardId: movie.id })) {

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                list: {
                    deleteMany: [{ forwardId: movieParam.forwardId }],
                },
            },
        })

        return "Movie removed from list."
    }
    else {
        console.log(user)
        console.log(movieParam)
        user.list.push(movieParam)
        return "Movie added to list"
    }
}

module.exports = {
    loginUser,
    registerUser,
    addMovieToList
}