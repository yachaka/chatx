
export const groupByUser = (messages) => {
  let grouped = [], last

  messages.forEach(m => {
    last = grouped[grouped.length - 1]

    if (grouped.length === 0
      || last.user.id !== m.user.id) {
      grouped.push({
        user: m.user,
        messages: []
      })
    }

    grouped[grouped.length - 1].messages.push(m)
  })

  return grouped
}