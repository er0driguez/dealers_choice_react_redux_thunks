const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-react-redux');
const faker = require('faker');

const Book = sequelize.define('book', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true, 
        defaultValue: Sequelize.UUIDV4
    }, 
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    checkedOut: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

const Author = sequelize.define('author', {
    name: {
        type: Sequelize.STRING
    }
});

Book.generateRandom = function() {
    return this.create({ title: `Sci-Fi Book Volume ${Math.floor(Math.random() * 10)}`, checkedOut: false, authorId: `${Math.floor(Math.random() * 3)}` })
}

Book.belongsTo(Author);
Author.hasMany(Book);

const syncAndSeed  = async() => {
        await sequelize.sync({ force: true });

        const [ leguin, butler, dick ] = await Promise.all([
            Author.create({ name: 'Ursula K. LeGuin' }),
            Author.create({ name: 'Octavia Butler' }),
            Author.create({ name: 'Philip K. Dick' }),
            ]);

            await Promise.all([
                Book.create({ title: 'Left Hand of Darkness', checkedOut: true, authorId: leguin.id }),
                Book.create({ title: 'The Dispossessed', checkedOut: false, authorId: leguin.id }),
                Book.create({ title: 'Kindred', checkedOut: false, authorId: butler.id }),
                Book.create({ title: 'Parable of the Sower', checkedOut: false, authorId: butler.id }),
                Book.create({ title: 'A Scanner Darkly', checkedOut: false, authorId: dick.id }),
                Book.create({ title: 'Do Androids Dream of Electric Sheep?', checkedOut: true, authorId: dick.id }),
            ])
}

module.exports = {
    sequelize,
    syncAndSeed,
    Book,
    Author
}