if (Profiles.find().count() === 0) {
  Profiles.insert({
    display: 'Gravity Boulevard',
    description: 'It’s where you want to be',
    country: 'us',
    state: 'fl',
    city: 'tampa',
    slug: 'gravityblvd'
  });

  Profiles.insert({
    display: 'Josh Sherman',
    description: 'California dreamin’',
    country: 'us',
    state: 'fl',
    city: 'tampa',
    slug: 'joshtronic'
  });
}
