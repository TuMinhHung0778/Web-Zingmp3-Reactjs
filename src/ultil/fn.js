export const getSliders = (start ,end, number) => {
    const limit = start > end ? number : end;
    let ouput = [];
    for (let i = start ; i <= limit ; i++) {
        ouput.push(i);
    }
    if(start > end){
        for (let i = 0 ; i <= end ; i++) {
            ouput.push(i);
        }
    }
    return ouput;
}