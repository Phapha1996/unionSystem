package glut.proposal.dao;

import glut.dao.IBaseDao;

import java.util.List;

public interface UserDAO extends IBaseDao {
	/**
	 * 根据指定的where语句查询符合条件的proposal
	 * 
	 * @param whereArgs
	 *            指定的where语句
	 * @return 返回的是非泛型的List,但由于是通过hql查询,所以其实List内部的泛型为<Proposal>
	 */
	List findProposals(String whereArgs);

}
