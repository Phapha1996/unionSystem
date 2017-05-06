package util;

import org.junit.runner.RunWith;
import org.springframework.test.AbstractTransactionalSpringContextTests;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
({ "classpath:applicationContext.xml","classpath:applicationContext-security.xml" })
@Transactional
public class MyTransactionalSpringContextTests extends
		AbstractTransactionalSpringContextTests {

	public MyTransactionalSpringContextTests() {
		// TODO Auto-generated constructor stub
	}


}
