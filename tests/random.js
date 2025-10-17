


function generateCompanyName() {
    const prefixes = ['Tech', 'Mega', 'Super', 'Global', 'Pro', 'Eco', 'Bio', 'Quantum', 'Digital', 'Smart'];
    const roots = ['Service', 'Trade', 'Group', 'Lab', 'Systems', 'Soft', 'House', 'Center', 'Market', 'Logistics'];
    const suffixes = ['Ltd', 'Inc', 'Corp', 'Group', 'Holding', '', 'Company'];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const root = roots[Math.floor(Math.random() * roots.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${prefix}${root}${suffix ? ' ' + suffix : ''}`;
}


function generateEnglishName() {
    const maleNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'];
    const femaleNames = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];

    const isMale = Math.random() > 0.5;

    const firstName = isMale ?
        maleNames[Math.floor(Math.random() * maleNames.length)] :
        femaleNames[Math.floor(Math.random() * femaleNames.length)];

    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${firstName} ${lastName}`;
}

module.exports = {
    generateCompanyName,
    generateEnglishName
}