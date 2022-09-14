import React, { Fragment, useState, useCallback, useEffect } from 'react'

export default function AdminRouteProtect({ component: Component }) {
  const [isAuth, setAuth] = useState(null)

  const authenticate = useCallback(async () => {
    fetch(process.env.REACT_APP_API_URL + "/admin/auth", {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => {
      return response.json()
    }).then(result => {
      setAuth(result.isAuth)
    })
  }, [])

  useEffect(() => {
    authenticate()
  }, [authenticate])


  return (
    <Fragment>
      {
        isAuth === null
          ? 'Authenticating...'
          : isAuth
            ? <Component />
            : window.location.href = "/403"
      }
    </Fragment>
  )
}
