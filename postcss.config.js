/**
 * Created by rogers on 2017/3/13.
 */

var autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: ['> 5%', 'iOS 8']
        })
    ]
}