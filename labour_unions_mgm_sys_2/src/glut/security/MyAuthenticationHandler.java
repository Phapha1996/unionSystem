package glut.security;

import glut.db.auto.Users;
import glut.db.auto.UsersRoles;
import glut.security.dao.UsersDao;
import glut.util.Constants;

import java.io.IOException;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class MyAuthenticationHandler implements AuthenticationSuccessHandler,
		AuthenticationFailureHandler {
	private static Logger logger = Logger
			.getLogger(MyAuthenticationHandler.class);
	private UsersDao usersDao;

	public UsersDao getUsersDao() {
		return usersDao;
	}

	public void setUsersDao(UsersDao usersDao) {
		this.usersDao = usersDao;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication auth)
			throws IOException, ServletException {
		logger.debug("MyAuthenticationHandler---onAuthenticationSuccess");
		String username = auth.getName();
		Users users = usersDao.findByName(username);
		Set<UsersRoles> roles = users.getUsersRoleses();
		StringBuilder strRole = new StringBuilder("{success:true,roles:'");
		for (UsersRoles role : roles) {
			strRole.append(role.getRoles().getName() + ",");
		}
		sendMsg2Client(response, strRole.substring(0, strRole.length() - 1)
				+ "'}");

		clearAuthenticationAttributes(request);
	}

	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException auth)
			throws IOException, ServletException {
		logger.debug("MyAuthenticationHandler---onAuthenticationFailure");

		sendMsg2Client(response, Constants.JSON_FAILURE);

		logger.debug(auth.getMessage());
	}

	private void sendMsg2Client(HttpServletResponse response, String msg)
			throws IOException {
		logger.debug("MyAuthenticationHandler---sendMsg2Client");

		//response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-type","text/html;charset=UTF-8");

		response.getWriter().println(msg);
		response.getWriter().flush();
/*		ServletOutputStream os=response.getOutputStream();
		os.println(msg);
		os.flush();*/
		//不关闭，Spring Security还要使用
		//out.close();
	}

	/**
	 * Removes temporary authentication-related data which may have been stored
	 * in the session during the authentication process.
	 */
	protected final void clearAuthenticationAttributes(
			HttpServletRequest request) {
		logger.debug("MyAuthenticationHandler---clearAuthenticationAttributes");

		HttpSession session = request.getSession(false);

		if (session == null) {
			return;
		}

		session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
	}

}