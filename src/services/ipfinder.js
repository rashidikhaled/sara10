/* eslint-disable no-undef */
import axios from 'axios'

export async function getIp () {
  try {
    const { data } = await axios.get(window.getConfigValue('ipfinder'))
    return data
  } catch {
    return null
  }
}
