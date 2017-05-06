package glut.action;

import glut.activity.service.UserService;
import glut.util.Constants;
import glut.util.MD5Utils;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;

@Controller
@Scope("prototype")
public class BaseAction extends ActionSupport {
	private String account;
	private String newPwd;
	private String oldpassword;
	private UserService userService;

	public String changPwd() throws Exception {
		newPwd = MD5Utils.toMD5(newPwd);
		oldpassword = MD5Utils.toMD5(oldpassword);
		if(userService.checkOldPwd(account,oldpassword)){
			try {
				userService.changePwd(account, newPwd);
				sendMsg2Client(Constants.JSON_SUCCESS);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				sendMsg2Client(Constants.JSON_FAILURE);
			}
		}else{
			sendMsg2Client(Constants.JSON_FAILURE);
		}
		return null;
	}

	protected void sendMsg2Client(String msg) {
		HttpServletResponse response = ServletActionContext.getResponse();
		try {
			response.setHeader("Content-type", "text/html;charset=UTF-8");
			response.getWriter().println(msg);
			response.getWriter().flush();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getOldpassword() {
		return oldpassword;
	}

	public void setOldpassword(String oldpassword) {
		this.oldpassword = oldpassword;
	}

	public String getNewPwd() {
		return newPwd;
	}

	public void setNewPwd(String newPwd) {
		this.newPwd = newPwd;
	}

	public UserService getUserService() {
		return userService;
	}

	@Resource
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
