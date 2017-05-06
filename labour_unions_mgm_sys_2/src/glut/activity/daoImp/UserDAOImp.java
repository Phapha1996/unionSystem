package glut.activity.daoImp;

import glut.activity.action.UserAction;
import glut.activity.dao.UserDAO;
import glut.dao.BaseDao;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

@Repository("userDAOImp_act")
public class UserDAOImp extends BaseDao implements UserDAO {
	private static Logger logger = Logger.getLogger(UserAction.class);

}
