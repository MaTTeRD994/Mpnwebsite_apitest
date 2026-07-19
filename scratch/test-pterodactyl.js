fetch('https://console.mpnhost.com/api/client', {
  headers: {
    'Authorization': 'Bearer ptlc_6yxmoCXGvOd1h81LnDCS3Adh7FPGcd8LEbucODquq2U',
    'Accept': 'application/json'
  }
})
.then(res => res.json())
.then(data => {
  const servers = data.data.map(s => ({
    name: s.attributes.name,
    identifier: s.attributes.identifier,
    node: s.attributes.node
  }));
  console.log(JSON.stringify(servers, null, 2));
})
.catch(err => console.error(err));
