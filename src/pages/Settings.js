import { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { language_for_id } from '../languages'

import { LanguageSelector } from '../components/LanguageSelector'

import { UserContext } from '../UserContext'
import LoadingAnimation from '../components/LoadingAnimation'

import LocalStorage from '../LocalStorage'

import * as s from '../pages/FormPage.sc'

export default function Settings ({ api, setUser }) {
  const [userDetails, setUserDetails] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()
  const user = useContext(UserContext)
  const [languages, setLanguages] = useState()

  useEffect(() => {
    api.getUserDetails(data => {
      api.getSystemLanguages(systemLanguages => {
        setLanguages(systemLanguages)
        setUserDetails(data)
      })
    })
    document.title = 'Zeeguu Settings'
  }, [user.session, api])

  function updateUserInfo (info) {
    LocalStorage.setUserInfo(info)
    setUser({
      ...user,
      name: info.name,
      learned_language: info.learned_language,
      native_language: info.native_language
    })
  }

  function handleSave (e) {
    e.preventDefault()

    api.saveUserDetails(userDetails, setErrorMessage, () => {
      updateUserInfo(userDetails)
      history.goBack()
    })
  }

  if (!userDetails || !languages) {
    return <LoadingAnimation />
  }

  return (
    <s.FormContainer>
      <form className='formSettings'>
        <h1>Account Settings</h1>
        <h5>{errorMessage}</h5>

        <label>Name </label>
        <input
          name='name'
          value={userDetails.name}
          onChange={e =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
        />
        <br />

        <label>Email </label>
        <input
          type='email'
          value={userDetails.email}
          onChange={e =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
        />

        <label>Learned Language </label>
        <LanguageSelector
          languages={languages.learnable_languages}
          selected={language_for_id(
            userDetails.learned_language,
            languages.learnable_languages
          )}
          onChange={e => {
            let code = e.target[e.target.selectedIndex].getAttribute('code')
            setUserDetails({
              ...userDetails,
              learned_language: code
            })
          }}
        />

        <label>Native Language </label>
        <LanguageSelector
          languages={languages.native_languages}
          selected={language_for_id(
            userDetails.native_language,
            languages.native_languages
          )}
          onChange={e => {
            let code = e.target[e.target.selectedIndex].getAttribute('code')
            setUserDetails({
              ...userDetails,
              native_language: code
            })
          }}
        />

        <div>
          <s.FormButton onClick={handleSave}>Save</s.FormButton>
        </div>
      </form>
    </s.FormContainer>
  )
}
