import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(res => res.json())
const API = process.env.NEXT_PUBLIC_AUTH0_BASE_URL + '/api/protected/members'

// TODO:
// 1.Delete dashboard.module (a whole css file for 1 rule, what a shame)

function Members ({}) {
  const { data, error } = useSWR(API, fetcher)
  const [members, setMembers] = useState([])

  useEffect(() => {
    if (data && !data.error) {
      const nodes = data.data.map(member => (
        <div key={member.id}>{member.fields.email}</div>
      ))
      setMembers(nodes)
    }
  }, [data])

  if (data && data.error)
    return `${data.error}. Contact us if the problem persists`
  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'
  return <div> {members}</div>
}

export default Members
