import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ProfilesCollection } from '/imports/db/ProfilesCollection';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { buttonTheme } from './Welcome';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddAPhotoSharpIcon from '@mui/icons-material/AddAPhotoSharp';

export const UserProfile = () => {

  const profile = useTracker(() => ProfilesCollection.findOne({ userIdNumber: Meteor.userId() }));

  const [disabledState, setDisabledState] = useState(true);

  const [profileName, setProfileName] = useState(profile.name);
  const [profileEmail, setProfileEmail] = useState(profile.email);
  const [profileBirthday, setProfileBirthday] = useState(profile.birthday);
  const [profileGender, setProfileGender] = useState(profile.gender);
  const [profileCompany, setProfileCompany] = useState(profile.company);
  const [profilePhoto, setProfilePhoto] = useState(profile.photo);

  const handleSave = () => {
    Meteor.call('profiles.setProfileInfo', {
      userIdNumber: Meteor.userId(),
      name: profileName.trim(),
      email: profileEmail.trim(),
      birthday: profileBirthday,
      gender: profileGender,
      company: profileCompany.trim(),
      photo: profilePhoto,
    });

    setDisabledState(true);
  };

  const handleCancel = () => {
    setProfileName(profile.name);
    setProfileEmail(profile.email);
    setProfileBirthday(profile.birthday);
    setProfileGender(profile.gender);
    setProfileCompany(profile.company);
    setProfilePhoto(profile.photo);

    setDisabledState(true);
  };

  const handleEdit = () => {
    setDisabledState(false);
  };

  const onLoad = fileString => {
    setProfilePhoto(fileString);
  };

  const getBase64 = file => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const handleImageUpload = e => {
    if (!e.target.files[0]) {
      return;
    }
    const file = e.target.files[0];
    getBase64(file);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>

      <Typography
        variant="h4"
        sx = {{ fontSize: "1.6rem", mt: 2, mb: 4, fontWeight: "bold"}}>
        Perfil de {Meteor.user().username}
      </Typography>

      <IconButton
        disabled={disabledState}
        component="label">
        <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
        {!profilePhoto ?
          <Avatar
            sx={{
              width: "100px",
              height: "100px",
            }}>
            <AddAPhotoSharpIcon sx = {{ transform: "scale(1.6)" }}/>
          </Avatar> :
          <Avatar
            src={profilePhoto}
            sx={{
              width: "100px",
              height: "100px",
            }}>
          </Avatar>
        }
      </IconButton>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px", mt: "10px" }}>
        <Typography
          sx = {{
            width: 160,
            textAlign: "right" }}>
          Nome:
        </Typography>

        <TextField
          required
          disabled={disabledState}
          variant="outlined"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          sx = {{
            width: 400,
            marginLeft: 1,
            marginRight: 18,
            backgroundColor: disabledState ? '#bdbdbd' : 'white',
            "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" }
          }}>
        </TextField>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px", mt: "10px" }}>
        <Typography
          sx = {{
            width: 160,
            textAlign: "right" }}>
          E-mail:
        </Typography>

        <TextField
          required
          disabled={disabledState}
          variant="outlined"
          value={profileEmail}
          onChange={(e) => setProfileEmail(e.target.value)}
          sx = {{
            width: 400,
            marginLeft: 1,
            marginRight: 18,
            backgroundColor: disabledState ? '#bdbdbd' : 'white',
            "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" }
          }}>
        </TextField>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" }}>
        <Typography
          sx = {{
            width: 160,
            textAlign: "right" }}>
          Data de Nascimento:
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            renderInput={(props) =>
              <TextField {...props}
              sx = {{
                width: 400,
                marginLeft: 1,
                marginRight: 18,
                backgroundColor: disabledState ? '#bdbdbd' : 'white',
                "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" }
              }}
              required/>
            }
            value={profileBirthday}
            disabled={disabledState}
            format="DD/MM/YYYY"
            onChange={setProfileBirthday}
          />
        </LocalizationProvider>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <Typography
          sx = {{
            width: 160,
            textAlign: "right" }}>
          Sexo:
        </Typography>

        <FormControl>
          <Select
            value={profileGender}
            disabled={disabledState}
            onChange={(e) => setProfileGender(e.target.value)}
            sx = {{
              width: 400,
              marginLeft: 1,
              marginRight: 18,
              backgroundColor: disabledState ? '#bdbdbd' : 'white',
              "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" }
            }}
          >
            <MenuItem value={"Masculino"}>Masculino</MenuItem>
            <MenuItem value={"Feminino"}>Feminino</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "15px", mt: "10px" }}>
        <Typography
          sx = {{
            width: 160,
            textAlign: "right" }}>
          Empresa:
        </Typography>

        <TextField
          required
          disabled={disabledState}
          variant="outlined"
          value={profileCompany}
          onChange={(e) => setProfileCompany(e.target.value)}
          sx = {{
            width: 400,
            marginLeft: 1,
            marginRight: 18,
            backgroundColor: disabledState ? '#bdbdbd' : 'white',
            "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "black" }
          }}>
        </TextField>
      </Box>

      <Box
        sx={{
          display: "flex",
          position: "absolute",
          bottom: 40,
          justifyContent: "space-around"
        }}>

        {disabledState? null :
          <ThemeProvider theme={buttonTheme}>
            <Button
              type="button"
              variant="contained"
              sx = {{
                fontWeight: "bold",
                fontSize: "large",
                mr: 8,
                ml: 8
              }}
              color="primary"
              onClick={handleCancel}>
              Cancelar
            </Button>
          </ThemeProvider>
        }

        <ThemeProvider theme={buttonTheme}>
          <Button
            type="button"
            variant="contained"
            sx = {{
              fontWeight: "bold",
              fontSize: "large",
              mr: 8,
              ml: 8
            }}
            color="primary"
            onClick={disabledState ? handleEdit : handleSave}>
            {disabledState ? 'Editar' : 'Salvar'}
          </Button>
        </ThemeProvider>
      </Box>


    </Box>
  );
};