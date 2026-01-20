// Test the formatLargeNumber function
function formatLargeNumber(num) {
  if (num === 0) return '0';
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum >= 1e30) {
    return `${sign}${(absNum / 1e30).toFixed(1)}Q`;
  } else if (absNum >= 1e27) {
    return `${sign}${(absNum / 1e27).toFixed(1)}R`;
  } else if (absNum >= 1e24) {
    return `${sign}${(absNum / 1e24).toFixed(1)}Y`;
  } else if (absNum >= 1e21) {
    return `${sign}${(absNum / 1e21).toFixed(1)}Z`;
  } else if (absNum >= 1e18) {
    return `${sign}${(absNum / 1e18).toFixed(1)}E`;
  } else if (absNum >= 1e15) {
    return `${sign}${(absNum / 1e15).toFixed(1)}P`;
  } else if (absNum >= 1e12) {
    return `${sign}${(absNum / 1e12).toFixed(1)}T`;
  } else if (absNum >= 1e9) {
    return `${sign}${(absNum / 1e9).toFixed(1)}B`;
  } else if (absNum >= 1e6) {
    return `${sign}${(absNum / 1e6).toFixed(1)}M`;
  } else if (absNum >= 1e3) {
    return `${sign}${(absNum / 1e3).toFixed(1)}K`;
  } else {
    return num.toLocaleString();
  }
}

// Test cases
console.log('Testing formatLargeNumber function:');
console.log('Original number:', 68000000000000000000000000000000);
console.log('Formatted:', formatLargeNumber(68000000000000000000000000000000));
console.log('');
console.log('Testing various large numbers:');
console.log('1,000:', formatLargeNumber(1000));
console.log('1,000,000:', formatLargeNumber(1000000));
console.log('1,000,000,000:', formatLargeNumber(1000000000));
console.log('1,000,000,000,000:', formatLargeNumber(1000000000000));
console.log('1,000,000,000,000,000:', formatLargeNumber(1000000000000000));
console.log('1,000,000,000,000,000,000:', formatLargeNumber(1000000000000000000));
console.log('1,000,000,000,000,000,000,000:', formatLargeNumber(1000000000000000000000));
console.log('1,000,000,000,000,000,000,000,000:', formatLargeNumber(1000000000000000000000000));
console.log('1,000,000,000,000,000,000,000,000,000:', formatLargeNumber(1000000000000000000000000000));
console.log('');
console.log('Testing the exact number from the issue:');
const hugeNumber = 68000000000000000000000000000000;
console.log('Original:', hugeNumber.toLocaleString());
console.log('Formatted:', formatLargeNumber(hugeNumber));
