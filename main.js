const URL = 'https://yalantis-react-school-api.yalantis.com/api/task0/users'
const app = new Vue({
  el: '#app',
  data: {
    monthes: [
      {
        name: 'January',
        statusClass: 'unset',
        users: []
      },
      {
        name: 'February',
        statusClass: 'unset',
        users: []
      }, 
      {
        name: 'March',
        statusClass: 'unset',
        users: []
      }, 
      {
        name: 'April',
        statusClass: 'unset',
        users: []
      },
      {
        name: 'May',
        statusClass: 'unset',
        users: []
      }, 
      {
        name: 'June',
        statusClass: 'unset',
        users: []
      },
      {
        name: 'July',
        statusClass: 'unset',
        users: []
      }, 
      {
        name: 'August',
        statusClass: 'unset',
        users: []
      },
      {
        name: 'September',
        statusClass: 'unset',
        users: []
      },
      {
        name: 'October',
        statusClass: 'unset',
        users: []
      },
      {
        name: 'November',
        statusClass: 'unset',
        users: []
      },
      {
        name: 'December',
        statusClass: 'unset',
        users: []
      }
    ],
    users: [],
    sortedUsers: [],
    chosenMonth: ''
  },
  created() {
    let readedData = ''
    fetch(URL)
      .then(response => response.body)
      .then(stream => stream.getReader())
      .then(reader => { 
        return reader.read().then(function loadChunk({done, value}) {
          if (done) {
            return app.users = JSON.parse(readedData)
          } else {
            const chunk = new TextDecoder('utf-8').decode(value)
            readedData += chunk
            return reader.read().then(loadChunk)                   
          }
        })
      })
      .then(users => {
        users.forEach(user => {
          const monthNumber = new Date(user.dob).getMonth()
          app.monthes[monthNumber].users.push(user)
        })
        return app.monthes
      })
      .then(monthes => {
        monthes.forEach(month => {
          month.users.sort((a, b) => {
            return Date.parse(a.dob) - Date.parse(b.dob)
          })
          const usersCount = month.users.length
          if(usersCount <= 2) {
            month.statusClass = 'gray'
          } else if (usersCount <= 6) {
            month.statusClass = 'blue'
          } else if (usersCount <= 10) {
            month.statusClass = 'green'
          } else {
            month.statusClass = 'red'
          }
        })
      })
      .catch(err => {
        throw err;
      })
  },
  methods: {
    show(index) {
      this.sortedUsers = this.monthes[index].users
      this.chosenMonth = this.monthes[index].name
    },
    hide() {
      this.sortedUsers = []
    },
    displayDate(date) {
      return new Date(date).toString().split('').splice(8, 7).join('').replace(' ', '. ');
    }
  }
})
