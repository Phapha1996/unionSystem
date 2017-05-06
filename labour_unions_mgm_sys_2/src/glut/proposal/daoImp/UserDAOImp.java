package glut.proposal.daoImp;

import glut.activity.action.AdminAction;
import glut.dao.BaseDao;
import glut.proposal.dao.UserDAO;
import glut.util.SessionPool;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

@Repository("userDAOImp_pro")
public class UserDAOImp extends BaseDao implements UserDAO {
	private static Logger logger = Logger.getLogger(AdminAction.class);

	@Override
	public List findProposals(String whereArgs) {
		// TODO Auto-generated method stub
		String hql = "from Proposal p where " + whereArgs;
		logger.debug("这里是查询提案的HQL:" + hql);
		return SessionPool.getCurrentSession().createQuery(hql).list();
	}

}
