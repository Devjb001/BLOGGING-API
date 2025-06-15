function calculateReadingTime(blogText){

    if(!blogText || typeof blogText !== "string"){
        return 1
    }

    const words = blogText.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const readingSpeed = 225;
    const minutes = wordCount / readingSpeed;

    return Math.max(1, Math.ceil(minutes)); 
}

module.exports = {
    calculateReadingTime
};