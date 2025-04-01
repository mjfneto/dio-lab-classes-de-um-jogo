class Hero {
  constructor(name, role, age = 18) {
    this.name = name
    this.age = age
    this.role = role
    this.guild = null

    switch (role) {
      case 'mago':
        this.ataque = 'magia'
        break
      case 'guerreiro':
        this.ataque = 'espada'
        break
      case 'monge':
        this.ataque = 'artes marciais'
        break
      case 'ninja':
        this.ataque = 'shuriken'
        break
      default:
        this.ataque = 'soco'
    }
  }

  createGuild(name) {
    this.guild = new Guild(name, this)
  }

  addToGuild(heroes) {
    if (!this.guild) {
      console.log(`${this.name} não está em uma guilda.`)
      return
    }

    if (this.guild.admin.name !== this.name) {
      console.log(`${this.name} não tem permissão para adicionar membros.`)
      return
    }

    for (const hero of heroes) {
      this.guild.members.push(hero)
    }

    console.log(
      `Os heróis ${heroes
        .map((hero) => hero.name)
        .join(', ')} foram adicionados à ${this.guild.name}`
    )
  }

  removeFromGuild(members) {
    if (!this.guild) {
      console.log(`${this.name} não está em uma guilda.`)
      return
    }

    if (this.guild.admin.name !== this.name) {
      console.log(`${this.name} não tem permissão para remover membros.`)
      return
    }

    this.guild.members = this.guild.members.filter(function (member) {
      return !members.includes(member)
    })

    console.log(
      `Os heróis ${members
        .map((member) => member.name)
        .join(', ')} foram removidos da ${this.guild.name}`
    )
  }

  attack() {
    console.log(`o ${this.role} ${this.name} atacou usando ${this.ataque}`)
  }
}

class Guild {
  constructor(name, admin) {
    this.name = name
    this.admin = admin
    this.members = [this.admin]
  }

  jointAttack() {
    for (let member of this.members) {
      member.attack()
    }
  }
}

const gimli = new Hero('Gimli', 'monge')
const boromir = new Hero('Boromir', 'guerreiro', 15)
const gandalf = new Hero('Gandalf', 'mago', 300)
const legolas = new Hero('Legolas', 'ninja')
const gollum = new Hero('Gollum', '', 200)

gandalf.createGuild('Sociedade do Anel')

console.log(gandalf)

gandalf.addToGuild([gimli, boromir, legolas, gollum])

console.log(gandalf.guild)

gandalf.removeFromGuild([gollum])

gandalf.guild.jointAttack()
