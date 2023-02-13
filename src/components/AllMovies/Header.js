import React from 'react';
import { Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

const DEFAULT_LANGUAGES = [
  {
    iso_639_1: 'en',
    english_name: 'English'
  },
  {
    iso_639_1: 'ar',
    english_name: 'Arabic'
  }
];

const Header = ({
  selectedLanguage,
  // setLoading,
  setLanguage
}) => {
  const history = useNavigate();
  const languages = DEFAULT_LANGUAGES;

  // const [languages, setLanguages] = useState(DEFAULT_LANGUAGES);
  // Implemented get languages API for all languages support.
  // const getLanguages = () => {
  //   setLoading(true);
  //   fetch(`https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.REACT_APP_API_KEY}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setLanguages([...data]);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   getLanguages();
  // }, []);

  const onLogoutClick = (event) => {
    event.preventDefault();
    sessionStorage.removeItem('auth_token');
    history('/login');
  };

  return (
    <div className="header">
      <Input
        className="language-field"
        name="select"
        type="select"
        value={selectedLanguage}
        onChange={(event) => setLanguage(event.target.value)}>
        {languages.map((lang) => (
          <option value={lang.iso_639_1} key={lang.iso_639_1 + lang.english_name}>
            {lang.iso_639_1}
          </option>
        ))}
      </Input>
      <Button onClick={onLogoutClick} className="logout-button">
        Logout
      </Button>
    </div>
  );
};

export default Header;
