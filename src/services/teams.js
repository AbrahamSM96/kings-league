export const getAllTeams = async () => {
  try {
    const response = await fetch('https://api.kingsleague.dev/teams')
    const teams = await (await response).json()

    return teams
  } catch (error) {
    return []
  }
}
