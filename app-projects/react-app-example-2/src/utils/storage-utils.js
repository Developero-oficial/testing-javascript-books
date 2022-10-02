export const setItem = ({key, value}) => {
  return localStorage.setItem(key, value)
}

export const getItem = ({key}) => {
  return localStorage.getItem(key)
}

export const removeItem = ({key}) => localStorage.removeItem(key)
