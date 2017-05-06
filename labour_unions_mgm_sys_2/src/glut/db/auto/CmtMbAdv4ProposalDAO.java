package glut.db.auto;

import java.util.List;
import org.hibernate.LockOptions;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.transaction.annotation.Transactional;

/**
 * A data access object (DAO) providing persistence and search support for
 * CmtMbAdv4Proposal entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see glut.db.auto.CmtMbAdv4Proposal
 * @author MyEclipse Persistence Tools
 */
@Transactional
public class CmtMbAdv4ProposalDAO {
	private static final Logger log = LoggerFactory
			.getLogger(CmtMbAdv4ProposalDAO.class);
	// property constants
	public static final String CMT_MB_ADV = "cmtMbAdv";
	public static final String CMT_MB_ADV_DPM1ST = "cmtMbAdvDpm1st";
	public static final String CMT_MB_ADV_DPM2ND = "cmtMbAdvDpm2nd";
	public static final String PROPOSAL_ID = "proposalId";

	private SessionFactory sessionFactory;

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	private Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

	protected void initDao() {
		// do nothing
	}

	public void save(CmtMbAdv4Proposal transientInstance) {
		log.debug("saving CmtMbAdv4Proposal instance");
		try {
			getCurrentSession().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(CmtMbAdv4Proposal persistentInstance) {
		log.debug("deleting CmtMbAdv4Proposal instance");
		try {
			getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public CmtMbAdv4Proposal findById(java.lang.Integer id) {
		log.debug("getting CmtMbAdv4Proposal instance with id: " + id);
		try {
			CmtMbAdv4Proposal instance = (CmtMbAdv4Proposal) getCurrentSession()
					.get("glut.db.auto.CmtMbAdv4Proposal", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(CmtMbAdv4Proposal instance) {
		log.debug("finding CmtMbAdv4Proposal instance by example");
		try {
			List results = getCurrentSession()
					.createCriteria("glut.db.auto.CmtMbAdv4Proposal")
					.add(Example.create(instance)).list();
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	public List findByProperty(String propertyName, Object value) {
		log.debug("finding CmtMbAdv4Proposal instance with property: "
				+ propertyName + ", value: " + value);
		try {
			String queryString = "from CmtMbAdv4Proposal as model where model."
					+ propertyName + "= ?";
			Query queryObject = getCurrentSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByCmtMbAdv(Object cmtMbAdv) {
		return findByProperty(CMT_MB_ADV, cmtMbAdv);
	}

	public List findByCmtMbAdvDpm1st(Object cmtMbAdvDpm1st) {
		return findByProperty(CMT_MB_ADV_DPM1ST, cmtMbAdvDpm1st);
	}

	public List findByCmtMbAdvDpm2nd(Object cmtMbAdvDpm2nd) {
		return findByProperty(CMT_MB_ADV_DPM2ND, cmtMbAdvDpm2nd);
	}

	public List findByProposalId(Object proposalId) {
		return findByProperty(PROPOSAL_ID, proposalId);
	}

	public List findAll() {
		log.debug("finding all CmtMbAdv4Proposal instances");
		try {
			String queryString = "from CmtMbAdv4Proposal";
			Query queryObject = getCurrentSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public CmtMbAdv4Proposal merge(CmtMbAdv4Proposal detachedInstance) {
		log.debug("merging CmtMbAdv4Proposal instance");
		try {
			CmtMbAdv4Proposal result = (CmtMbAdv4Proposal) getCurrentSession()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(CmtMbAdv4Proposal instance) {
		log.debug("attaching dirty CmtMbAdv4Proposal instance");
		try {
			getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(CmtMbAdv4Proposal instance) {
		log.debug("attaching clean CmtMbAdv4Proposal instance");
		try {
			getCurrentSession().buildLockRequest(LockOptions.NONE).lock(
					instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static CmtMbAdv4ProposalDAO getFromApplicationContext(
			ApplicationContext ctx) {
		return (CmtMbAdv4ProposalDAO) ctx.getBean("CmtMbAdv4ProposalDAO");
	}
}