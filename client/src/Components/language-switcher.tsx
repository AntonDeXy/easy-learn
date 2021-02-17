import React from 'react'
import { LanguageSwitcherSt } from './Styled/Styled'
import { useTranslation } from 'react-i18next'
import { changeLanguageThunk } from '../redux/reducers/users/usersReducer'
import { connect } from 'react-redux'

type LanguageSwitcher = {
  userId: string
  changeLanguage: (userId: string, language: string, success: any) => void
}

const LanguageSwitcher:React.FC<LanguageSwitcher> = ({changeLanguage, userId}) => {
  const { i18n } = useTranslation() 
  const currentLanguage = i18n.languages[0]

  const handleChangeLanguage = (language: string) => {
    changeLanguage(
      userId,
      language,
      () => {
        i18n.changeLanguage(language)
      })
  }

  return (
    <LanguageSwitcherSt>
      <div className={`${currentLanguage === 'rus' && 'current'}`} onClick={() => handleChangeLanguage('rus')}>rus</div>
      <div className={`${currentLanguage === 'en' && 'current'}`} onClick={() => handleChangeLanguage('en')}>en</div>
    </LanguageSwitcherSt>
  )
}


const mapStateToProps = (state:any) => ({
  userId: state.userReducer._id
})

const mapDispatchToProps = (dispatch:any) => ({
  changeLanguage: (userId: string, language: string, success: any) => dispatch(changeLanguageThunk(userId, language, success))
})

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher)