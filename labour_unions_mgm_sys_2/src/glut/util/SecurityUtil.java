package glut.util;

import glut.db.auto.Users;

import javax.servlet.http.HttpServletRequest;

public class SecurityUtil {

	//返回用户姓名和工号，如：张三(2001001)(工会)
	public static String getUserName(HttpServletRequest request) {

		String username = "";
		try {
			Users user = (Users) request.getSession().getAttribute(
					Constants.SESSION_ATTR_USERINFO);
			String name = user.getMember().getName();
			String num = user.getMember().getNumber();
			String dpm = user.getMember().getDpmBrief();
			username = name + "(" + num + ")"+ "(" + dpm + ")";

		} catch (Exception e) {

		}
		return username;
	}

	//返回用户姓名和工号，如：张三(2001001)
	public static Users getUserInfo(HttpServletRequest request) {

		return (Users) request.getSession().getAttribute(
				Constants.SESSION_ATTR_USERINFO);
	}

}
