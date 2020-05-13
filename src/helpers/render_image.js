import missing from '../images/missing.png';

export const renderImage = (profile_picture) => {
  if(profile_picture === '/images/missing.png') {
    return missing
  } else {
    return profile_picture
  }
}
