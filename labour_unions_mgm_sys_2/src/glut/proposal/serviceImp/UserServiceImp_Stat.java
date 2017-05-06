package glut.proposal.serviceImp;

import java.util.List;

import javax.annotation.Resource;
import javax.swing.JFrame;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import glut.activity.action.AdminAction;
import glut.db.auto.Proposal;
import glut.proposal.dao.UserDAO;
import glut.proposal.service.UserService;
import glut.proposal.service.UserService_Stat;

/**
 * 
 * @author leo 20151220 返回统计信息数据
 */
@Transactional
@Service("userServiceImp_stat_pro")
public class UserServiceImp_Stat extends UserServiceImp implements
		UserService_Stat {
	private UserDAO userDAO;
	private static Logger logger = Logger.getLogger(AdminAction.class);

	// 查询提案统计信息
	// SELECT submitter_dpm,count(id) from proposal GROUP BY submitter_dpm;
	// SELECT category,count(id) from proposal GROUP BY category;
	@Override
	public String getStatictis() {
		// TODO Auto-generated method stub
		// list中的类型请对应上方的sql
		List stat_dpm = userDAO.findByArgs("submitter_dpm,count(id)",
				"proposal", null, "submitter_dpm", null, null, true);
		List stat_category = userDAO.findByArgs("category,count(id)",
				"proposal", null, "category", null, null, true);
		
		return "";

	}
	
	/**
	 * @author xupk 20151222
	 * 取得数据库数据
	 * */
	@Override
	public List loadDataFromDB(String fields) {
		// TODO Auto-generated method stub
		if("submitter_dpm".equals(fields)){
			List<Object[]> stat_dpm = userDAO.findByArgs("submitter_dpm,count(id)",
					"proposal", null, "submitter_dpm", null, null, true);
			return stat_dpm;
		}else if("category".equals(fields)){
			List<Object[]> stat_category = userDAO.findByArgs("category,count(id)",
					"proposal", null, "category", null, null, true);
			return stat_category;
		}
		return null;
		
	}
	
	/**
	 * @author xupk 20151223
	 * 获取提案总数量
	 * */
	@Override
	public List getCountNum() {
		// TODO Auto-generated method stub
		List count = userDAO.findByArgs("count(id)",
				"Proposal", "'1'='1'", null, null, null, false);
		return count;
	}

	public UserDAO getUserDAO() {
		return userDAO;
	}

	@Resource(name="userDAOImp_pro")
	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	
}
