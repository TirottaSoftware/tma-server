const { PrismaClient } = require('@prisma/client')
const _ = require('lodash')

const prisma = new PrismaClient();

async function getUserList(uid) {
    const user = await prisma.user.findFirst({ where: { id: uid, isDeleted: false }, include: { list: true } })

    if (user) {
        return user?.list
    }
    else {
        return { error: "User list could not be found." }
    }
}

async function isInList(movieId, uid) {
    const user = await prisma.user.findFirst({
        where: {
            id: uid,
            isDeleted: false
        },
        include: {
            list: true
        }
    })

    if (_.find(user?.list, { forwardId: movieId })) {
        return true
    }
    else {
        return false
    }
}

module.exports = { getUserList, isInList }