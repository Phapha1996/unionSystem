package glut.security;

import glut.db.auto.Users;
import glut.security.dao.UsersDao;
import glut.util.Constants;
import glut.util.MD5Utils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/*
 * MyUsernamePasswordAuthenticationFilter
	attemptAuthentication
		this.getAuthenticationManager()
			ProviderManager.java
				authenticate(UsernamePasswordAuthenticationToken authRequest)
					AbstractUserDetailsAuthenticationProvider.java
						authenticate(Authentication authentication)
							P155 user = retrieveUser(username, (UsernamePasswordAuthenticationToken) authentication);
								DaoAuthenticationProvider.java
									P86 loadUserByUsername
 */
public class MyUsernamePasswordAuthenticationFilter extends
		UsernamePasswordAuthenticationFilter {
	public static final String VALIDATE_CODE = "validateCode";
	public static final String USERNAME = "username";
	public static final String PASSWORD = "password";

	private static Logger logger = Logger
			.getLogger(MyUsernamePasswordAuthenticationFilter.class);

	@Resource
	private UsersDao usersDao;

	public UsersDao getUsersDao() {
		return usersDao;
	}

	public void setUsersDao(UsersDao usersDao) {
		this.usersDao = usersDao;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException {

		logger.debug("MyUsernamePasswordAuthenticationFilter---attemptAuthentication");

		if (!request.getMethod().equals("POST")) {
			throw new AuthenticationServiceException(
					"Authentication method not supported: "
							+ request.getMethod());
		}

		//checkValidateCode(request);

		String username = obtainUsername(request);
		//对密码进行md5处理
		String password = MD5Utils.toMD5(obtainPassword(request));

		//��֤�û��˺��������Ƿ��Ӧ
		username = username.trim();
		logger.debug("before findByNameUnionMember");
		Users users = this.usersDao.findByName(username);
		logger.debug("after findByNameUnionMember");
		logger.debug("这里是users:"
				+ (users != null ? users.toString() : "user is null"));
		if (users == null || !users.getPassword().equals(password)) {
			/*
			 
				if (forwardToDestination) {
			        request.setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION, exception);
			    } else {
			        HttpSession session = request.getSession(false);

			        if (session != null || allowSessionCreation) {
			            request.getSession().setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION, exception);
			        }
			    }
			 */
			/*			PrintWriter out = null;
						try {
							out = response.getWriter();
							out.print(Constants.JSON_LOGIN_FAILURE);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}*/
			throw new AuthenticationServiceException(
					"password or username is notEquals");
		}

		//UsernamePasswordAuthenticationTokenʵ�� Authentication
		UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
				username, password);
		// Place the last username attempted into HttpSession for views

		// ��������������ϸ����
		setDetails(request, authRequest);
		//把用户信息存入session
		request.getSession().setAttribute(Constants.SESSION_ATTR_USERINFO,
				users);

		// ����UserDetailsService��loadUserByUsername �ٴη�װAuthentication
		return this.getAuthenticationManager().authenticate(authRequest);
	}

	protected void checkValidateCode(HttpServletRequest request) {
		logger.debug("MyUsernamePasswordAuthenticationFilter---checkValidateCode");
		HttpSession session = request.getSession();

		String sessionValidateCode = obtainSessionValidateCode(session);
		//����һ�ε���֤��ʧЧ
		session.setAttribute(VALIDATE_CODE, null);
		String validateCodeParameter = obtainValidateCodeParameter(request);
		if (StringUtils.isEmpty(validateCodeParameter)
				|| !sessionValidateCode.equalsIgnoreCase(validateCodeParameter)) {
			throw new AuthenticationServiceException("validateCode.notEquals");
		}
	}

	private String obtainValidateCodeParameter(HttpServletRequest request) {
		logger.debug("MyUsernamePasswordAuthenticationFilter---obtainValidateCodeParameter");
		Object obj = request.getParameter(VALIDATE_CODE);
		return null == obj ? "" : obj.toString();
	}

	protected String obtainSessionValidateCode(HttpSession session) {
		logger.debug("MyUsernamePasswordAuthenticationFilter---obtainSessionValidateCode");
		Object obj = session.getAttribute(VALIDATE_CODE);
		return null == obj ? "" : obj.toString();
	}

	@Override
	protected String obtainUsername(HttpServletRequest request) {
		logger.debug("MyUsernamePasswordAuthenticationFilter---obtainUsername");
		Object obj = request.getParameter(USERNAME);
		return null == obj ? "" : obj.toString();
	}

	@Override
	protected String obtainPassword(HttpServletRequest request) {
		logger.debug("MyUsernamePasswordAuthenticationFilter---obtainPassword");
		Object obj = request.getParameter(PASSWORD);
		return null == obj ? "" : obj.toString();
	}

}
