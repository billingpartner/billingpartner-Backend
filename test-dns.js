const dns = require('dns');
const host = 'mysql-8c1ff61-billingpartner.k.aivencloud.com';

console.log(`Checking DNS for: ${host}`);

dns.lookup(host, (err, address, family) => {
  if (err) {
    console.error('DNS Lookup Failed:', err);
  } else {
    console.log(`Address: ${address}, Family: IPv${family}`);
  }
});
