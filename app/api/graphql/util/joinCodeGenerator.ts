const generateJoinCode = (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomSequence = '';
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomSequence += letters[randomIndex];
    }
    
    return randomSequence;
}

export default generateJoinCode;