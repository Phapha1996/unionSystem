package glut.db.auto;

import java.util.Date;
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
 * Proposal entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see glut.db.auto.Proposal
 * @author MyEclipse Persistence Tools
 */
@Transactional
public class ProposalDAO {
	private static final Logger log = LoggerFactory
			.getLogger(ProposalDAO.class);
	// property constants
	public static final String SUBMITTER_NAME = "submitterName";
	public static final String SUBMITTER_DPM = "submitterDpm";
	public static final String SUBMITTER_PHONE = "submitterPhone";
	public static final String SUPPORTER1 = "supporter1";
	public static final String SUPPORTER2 = "supporter2";
	public static final String CATEGORY = "category";
	public static final String TITLE = "title";
	public static final String REASON = "reason";
	public static final String ACTION = "action";
	public static final String COMMITTEE_ADV = "committeeAdv";
	public static final String RELEVANT_DPM = "relevantDpm";
	public static final String PROGRESS = "progress";
	public static final String REPLY_CONTENT = "replyContent";
	public static final String MEMO = "memo";
	public static final String NEXT_UNIT = "nextUnit";
	public static final String COMMENT = "comment";
	public static final String FEEDBACK = "feedback";
	public static final String MAIN_UNIT = "mainUnit";
	public static final String ASSISTANT_UNIT = "assistantUnit";
	public static final String DPM_REPLY = "dpmReply";
	public static final String RESPONSE_LEADER = "responseLeader";
	public static final String LD_OPINION = "ldOpinion";
	public static final String LD_OPINION_FLAG = "ldOpinionFlag";
	public static final String DPM_REPLY_FLAG = "dpmReplyFlag";
	public static final String DLG_REPLY_FLAG = "dlgReplyFlag";

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

	public void save(Proposal transientInstance) {
		log.debug("saving Proposal instance");
		try {
			getCurrentSession().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Proposal persistentInstance) {
		log.debug("deleting Proposal instance");
		try {
			getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Proposal findById(java.lang.String id) {
		log.debug("getting Proposal instance with id: " + id);
		try {
			Proposal instance = (Proposal) getCurrentSession().get(
					"glut.db.auto.Proposal", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(Proposal instance) {
		log.debug("finding Proposal instance by example");
		try {
			List results = getCurrentSession()
					.createCriteria("glut.db.auto.Proposal")
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
		log.debug("finding Proposal instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Proposal as model where model."
					+ propertyName + "= ?";
			Query queryObject = getCurrentSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findBySubmitterName(Object submitterName) {
		return findByProperty(SUBMITTER_NAME, submitterName);
	}

	public List findBySubmitterDpm(Object submitterDpm) {
		return findByProperty(SUBMITTER_DPM, submitterDpm);
	}

	public List findBySubmitterPhone(Object submitterPhone) {
		return findByProperty(SUBMITTER_PHONE, submitterPhone);
	}

	public List findBySupporter1(Object supporter1) {
		return findByProperty(SUPPORTER1, supporter1);
	}

	public List findBySupporter2(Object supporter2) {
		return findByProperty(SUPPORTER2, supporter2);
	}

	public List findByCategory(Object category) {
		return findByProperty(CATEGORY, category);
	}

	public List findByTitle(Object title) {
		return findByProperty(TITLE, title);
	}

	public List findByReason(Object reason) {
		return findByProperty(REASON, reason);
	}

	public List findByAction(Object action) {
		return findByProperty(ACTION, action);
	}

	public List findByCommitteeAdv(Object committeeAdv) {
		return findByProperty(COMMITTEE_ADV, committeeAdv);
	}

	public List findByRelevantDpm(Object relevantDpm) {
		return findByProperty(RELEVANT_DPM, relevantDpm);
	}

	public List findByProgress(Object progress) {
		return findByProperty(PROGRESS, progress);
	}

	public List findByReplyContent(Object replyContent) {
		return findByProperty(REPLY_CONTENT, replyContent);
	}

	public List findByMemo(Object memo) {
		return findByProperty(MEMO, memo);
	}

	public List findByNextUnit(Object nextUnit) {
		return findByProperty(NEXT_UNIT, nextUnit);
	}

	public List findByComment(Object comment) {
		return findByProperty(COMMENT, comment);
	}

	public List findByFeedback(Object feedback) {
		return findByProperty(FEEDBACK, feedback);
	}

	public List findByMainUnit(Object mainUnit) {
		return findByProperty(MAIN_UNIT, mainUnit);
	}

	public List findByAssistantUnit(Object assistantUnit) {
		return findByProperty(ASSISTANT_UNIT, assistantUnit);
	}

	public List findByDpmReply(Object dpmReply) {
		return findByProperty(DPM_REPLY, dpmReply);
	}

	public List findByResponseLeader(Object responseLeader) {
		return findByProperty(RESPONSE_LEADER, responseLeader);
	}

	public List findByLdOpinion(Object ldOpinion) {
		return findByProperty(LD_OPINION, ldOpinion);
	}

	public List findByLdOpinionFlag(Object ldOpinionFlag) {
		return findByProperty(LD_OPINION_FLAG, ldOpinionFlag);
	}

	public List findByDpmReplyFlag(Object dpmReplyFlag) {
		return findByProperty(DPM_REPLY_FLAG, dpmReplyFlag);
	}

	public List findByDlgReplyFlag(Object dlgReplyFlag) {
		return findByProperty(DLG_REPLY_FLAG, dlgReplyFlag);
	}

	public List findAll() {
		log.debug("finding all Proposal instances");
		try {
			String queryString = "from Proposal";
			Query queryObject = getCurrentSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Proposal merge(Proposal detachedInstance) {
		log.debug("merging Proposal instance");
		try {
			Proposal result = (Proposal) getCurrentSession().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Proposal instance) {
		log.debug("attaching dirty Proposal instance");
		try {
			getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Proposal instance) {
		log.debug("attaching clean Proposal instance");
		try {
			getCurrentSession().buildLockRequest(LockOptions.NONE).lock(
					instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static ProposalDAO getFromApplicationContext(ApplicationContext ctx) {
		return (ProposalDAO) ctx.getBean("ProposalDAO");
	}
}