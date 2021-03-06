const client = require('../client.js');

module.exports = async (studentObj, oauthToken) => {

    const studentInfo = {
        student_id: studentObj.id,
        user_name: studentObj.first_name + ' ' + studentObj.last_name,
        email: studentObj.email,
        pic_url: studentObj.pic_url,
        account_id: studentObj.account_id,
        access_token: oauthToken
    }

    const accountExists = await client.query(`
    SELECT 1
    FROM students
    WHERE student_id = $1`,
        [studentInfo.student_id]);

    if (accountExists.rows != '') {
        studentInfo.new_user = false;
    } else {
        studentInfo.new_user = true;
    };

    return studentInfo;
}